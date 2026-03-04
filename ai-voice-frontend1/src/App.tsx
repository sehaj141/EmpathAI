import { useState } from 'react';
import { MessageSquare, Phone, Brain } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './app/components/ui/tabs';
import ChatInterface from './app/components/ChatInterface';
import { VoiceCallInterface } from './app/components/VoiceCallInterface';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                EmpathAI
              </h1>
              <p className="text-xs text-slate-400">
                Advanced Therapeutic Intelligence
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="size-full flex flex-col">

          <TabsList className="w-full max-w-3xl mx-auto bg-transparent h-auto p-0 gap-1 border-b border-white/10">
            <TabsTrigger value="chat" className="flex-1 py-4 gap-2">
              <MessageSquare className="w-4 h-4" />
              Neural Chat
            </TabsTrigger>

            <TabsTrigger value="voice" className="flex-1 py-4 gap-2">
              <Phone className="w-4 h-4" />
              Voice Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="voice" className="flex-1 m-0 overflow-hidden">
            <VoiceCallInterface />
          </TabsContent>

        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-3 text-center text-xs text-slate-400">
        ⚡ AI Powered · Local Ollama Backend
      </footer>
    </div>
  );
}