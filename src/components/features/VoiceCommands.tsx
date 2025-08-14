import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  Settings,
  CheckCircle,
  Play,
  Square
} from "lucide-react";

interface VoiceCommand {
  id: string;
  command: string;
  response: string;
  timestamp: string;
  status: "success" | "error" | "processing";
}

interface CommandSuggestion {
  category: string;
  commands: string[];
}

const commandSuggestions: CommandSuggestion[] = [
  {
    category: "Analytics",
    commands: [
      "Show yesterday's efficiency metrics",
      "What's the current carbon footprint?",
      "Display water usage for this month",
      "Show me the energy consumption trend"
    ]
  },
  {
    category: "Equipment Status",
    commands: [
      "Check mill one status",
      "Show critical equipment alerts",
      "What's the boiler temperature?",
      "Display maintenance schedule"
    ]
  },
  {
    category: "Navigation",
    commands: [
      "Go to circularity dashboard",
      "Open AI insights",
      "Switch to analytics view",
      "Show process flow diagram"
    ]
  },
  {
    category: "Reports",
    commands: [
      "Generate sustainability report",
      "Export efficiency data",
      "Create maintenance summary",
      "Show compliance metrics"
    ]
  }
];

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([
    {
      id: "1",
      command: "Show me the current efficiency metrics",
      response: "Current overall efficiency is 89.2%. Mills are operating at 87% and 91% efficiency respectively.",
      timestamp: "10:25 AM",
      status: "success"
    },
    {
      id: "2", 
      command: "What's the carbon footprint for today?",
      response: "Today's carbon footprint is 847 tons CO₂, which is 12% below target.",
      timestamp: "10:22 AM",
      status: "success"
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        setCurrentTranscript(transcript);

        if (event.results[0].isFinal) {
          processVoiceCommand(transcript);
          setCurrentTranscript("");
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (synthesisRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      synthesisRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const processVoiceCommand = (command: string) => {
    const commandLower = command.toLowerCase();
    let response = "";

    // Simulate command processing
    if (commandLower.includes("efficiency") || commandLower.includes("performance")) {
      response = "Current overall efficiency is 89.2%. Primary mill is at 87%, secondary mill at 91%.";
    } else if (commandLower.includes("carbon") || commandLower.includes("footprint")) {
      response = "Carbon footprint today is 847 tons CO₂, which is 12% below our target.";
    } else if (commandLower.includes("water") || commandLower.includes("usage")) {
      response = "Water conservation is at 2.4 million liters saved, 18% above last month.";
    } else if (commandLower.includes("alert") || commandLower.includes("warning")) {
      response = "There are 3 active alerts: 1 critical boiler vibration, 2 medium priority maintenance items.";
    } else if (commandLower.includes("temperature")) {
      response = "Main boiler temperature is 95°C, primary mill at 82°C, secondary mill at 76°C.";
    } else if (commandLower.includes("maintenance")) {
      response = "Next scheduled maintenance: Primary mill on August 20th, boiler inspection on August 16th.";
    } else if (commandLower.includes("dashboard") || commandLower.includes("navigate")) {
      response = "Navigation command processed. Switching to requested dashboard.";
    } else {
      response = "I'm sorry, I didn't understand that command. Please try again or check the available commands.";
    }

    const newCommand: VoiceCommand = {
      id: Date.now().toString(),
      command: command,
      response: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "success"
    };

    setCommandHistory(prev => [newCommand, ...prev.slice(0, 9)]);
    
    if (voiceEnabled) {
      speak(response);
    }
  };

  const handleSuggestionClick = (command: string) => {
    processVoiceCommand(command);
  };

  return (
    <div className="space-y-6">
      {/* Voice Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Voice Assistant - Sugar Twin AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={isListening ? stopListening : startListening}
              className="w-32"
            >
              {isListening ? (
                <>
                  <MicOff className="h-5 w-5 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Listen
                </>
              )}
            </Button>
            
            <Button
              size="lg"
              variant={isSpeaking ? "destructive" : "outline"}
              onClick={isSpeaking ? stopSpeaking : () => speak("Voice assistant is ready")}
              className="w-32"
            >
              {isSpeaking ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Test
                </>
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="w-32"
            >
              {voiceEnabled ? (
                <>
                  <Volume2 className="h-5 w-5 mr-2" />
                  Audio On
                </>
              ) : (
                <>
                  <VolumeX className="h-5 w-5 mr-2" />
                  Audio Off
                </>
              )}
            </Button>
          </div>
          
          {/* Current Transcript */}
          {(isListening || currentTranscript) && (
            <Alert className="mb-4">
              <Mic className="h-4 w-4" />
              <AlertDescription>
                {isListening ? (
                  <>
                    <strong>Listening...</strong>
                    {currentTranscript && (
                      <div className="mt-2 p-2 bg-muted rounded">
                        "{currentTranscript}"
                      </div>
                    )}
                  </>
                ) : (
                  "Voice recognition stopped."
                )}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Status Indicators */}
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span>Listening</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span>Speaking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${voiceEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span>Audio Output</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Command History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Commands
              <Badge variant="secondary">{commandHistory.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {commandHistory.map((cmd) => (
              <div key={cmd.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">{cmd.timestamp}</span>
                  </div>
                  <Badge variant={cmd.status === "success" ? "default" : "destructive"}>
                    {cmd.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">"{cmd.command}"</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-sm">
                    {cmd.response}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Command Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Available Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {commandSuggestions.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium text-sm mb-2 text-primary">{category.category}</h4>
                <div className="space-y-1">
                  {category.commands.map((command, cmdIndex) => (
                    <Button
                      key={cmdIndex}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 text-wrap"
                      onClick={() => handleSuggestionClick(command)}
                    >
                      "{command}"
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}