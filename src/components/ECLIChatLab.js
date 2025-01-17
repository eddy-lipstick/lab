// components/ECLIChatLab.js
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Bot, Loader2, Search } from 'lucide-react';

const ECLIChatLab = () => {
    const [ecliInput, setEcliInput] = useState('');
    const [caseText, setCaseText] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingCase, setFetchingCase] = useState(false);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const fetchECLICase = async () => {
        if (!ecliInput.trim()) {
            setError("Voer eerst een ECLI nummer in");
            return;
        }

        setFetchingCase(true);
        setError(null);

        try {
            const response = await fetch(`https://test.feitlijn.nl/api/get_raw_ecli_data/${ecliInput}`);

            if (!response.ok) {
                throw new Error(`HTTP fout! status: ${response.status}. Controleer het ECLI nummer of probeer het later opnieuw.`);
            }

            const data = await response.json();
            setCaseText(data.raw_text);

            // Reset messages when loading new case
            setMessages([{
                type: 'assistant',
                content: `Ik heb de uitspraak ${ecliInput} geladen. Wat wilt u weten over deze zaak?`,
                timestamp: new Date().toISOString()
            }]);
        } catch (err) {
            console.error("Error fetching case:", err);
            setError(err.message);
            setCaseText('');
        } finally {
            setFetchingCase(false);
        }
    };

    const handleECLISubmit = async (e) => {
        e.preventDefault();
        if (!ecliInput.trim() || fetchingCase) return;
        await fetchECLICase();
    };

    const processMessage = async (message) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    context: caseText,
                    history: messages.map(msg => ({
                        type: msg.type,
                        content: msg.content
                    }))
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Kon bericht niet verwerken');
            }

            const data = await response.json();
            return data.response;
        } catch (err) {
            console.error("Chat error:", err);
            setError(err.message || 'Kon bericht niet verwerken. Probeer het opnieuw.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || loading || !caseText) return;

        const userMessage = chatInput.trim();
        setChatInput('');

        // Add user message
        setMessages(prev => [...prev, {
            type: 'user',
            content: userMessage,
            timestamp: new Date().toISOString()
        }]);

        // Process the message
        const response = await processMessage(userMessage);
        if (response) {
            setMessages(prev => [...prev, {
                type: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            }]);
        }
    };

    const renderMessage = (message, index) => {
        const isUser = message.type === 'user';

        return (
            <div
                key={index}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
            >
                <div
                    className={`flex items-start space-x-2 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                        }`}
                >
                    <div
                        className={`p-2 rounded-full ${isUser ? 'bg-blue-100' : 'bg-gray-100'
                            }`}
                    >
                        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div
                        className={`p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
                            }`}
                    >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* ECLI Input Section */}
            <form onSubmit={handleECLISubmit} className="flex space-x-2">
                <Input
                    value={ecliInput}
                    onChange={(e) => setEcliInput(e.target.value)}
                    placeholder="ECLI nummer (bijv. ECLI:NL:HR:2023:1234)"
                    disabled={fetchingCase}
                    className="flex-1"
                />
                <Button type="submit" disabled={fetchingCase || !ecliInput.trim()}>
                    {fetchingCase ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Chat Interface */}
            {caseText && (
                <Card className="h-[600px] flex flex-col">
                    <CardContent className="flex-1 flex flex-col p-4">
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4">
                                {messages.map(renderMessage)}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        <form onSubmit={handleChatSubmit} className="mt-4 flex space-x-2">
                            <Input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Stel een vraag over de uitspraak..."
                                disabled={loading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={loading || !chatInput.trim()}>
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ECLIChatLab;