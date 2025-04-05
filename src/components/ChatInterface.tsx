import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Avatar, message } from 'antd';
import { SendOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { sendChatRequest } from '../services/api';
import { ChatMessage } from '../services/api';
import './ChatInterface.css';

interface Message {
  id: number;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: '您好！欢迎访问美美生活！我们专注于为中国客户提供美国公司注册与税务申报服务。请问有什么可以帮助您的吗？',
      type: 'assistant',
      timestamp: new Date(Date.now() - 600000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToDeepSeek = async (userMessage: string) => {
    try {
      // 准备发送到DeepSeek API的消息历史
      const apiMessages: ChatMessage[] = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // 添加用户的新消息
      apiMessages.push({
        role: 'user',
        content: userMessage
      });
      
      setIsLoading(true);
      
      // 使用API服务发送请求
      const response = await sendChatRequest(apiMessages, 'deepseek-chat');
      
      // 获取API响应
      const aiMessage = response.choices[0].message.content;
      
      // 添加AI回复到对话列表
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          content: aiMessage,
          type: 'assistant',
          timestamp: new Date(),
        }
      ]);
      
    } catch (error) {
      console.error('调用DeepSeek API出错:', error);
      message.error('AI回复失败，请稍后再试');
      
      // 添加错误提示
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          content: '很抱歉，我暂时无法回复，请稍后再试。',
          type: 'assistant',
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    // 添加用户消息
    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // 发送消息到DeepSeek API
    await sendMessageToDeepSeek(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-interface" style={{ padding: 0, margin: 0 }}>
      <div className="chat-history" style={{ padding: 0, margin: 0 }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
            style={{ padding: 0, margin: '0 0 8px 0' }}
          >
            <div className="message-avatar" style={{ 
              padding: 0, 
              margin: message.type === 'assistant' ? '4px 4px 0 2px' : '4px 2px 0 4px' 
            }}>
              {message.type === 'user' ? (
                <Avatar icon={<UserOutlined />} size="small" />
              ) : (
                <div style={{ 
                  backgroundColor: '#1a73e8',
                  fontSize: '10px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  marginLeft: 0
                }}>AI</div>
              )}
            </div>
            <div className="message-content" style={{ padding: 0, margin: 0 }}>
              <div className="message-bubble" style={{ margin: 0 }}>
                {message.content}
              </div>
              <div className="message-time" style={{ margin: '4px 0 0 0', padding: 0 }}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message" style={{ padding: 0, margin: '0 0 8px 0' }}>
            <div className="message-avatar" style={{ padding: 0, margin: '4px 4px 0 2px' }}>
              <div style={{ 
                backgroundColor: '#1a73e8',
                fontSize: '10px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginLeft: 0
              }}>AI</div>
            </div>
            <div className="message-content" style={{ padding: 0, margin: 0 }}>
              <div className="message-bubble" style={{ margin: 0 }}>
                <LoadingOutlined style={{ marginRight: 5 }} /> 正在思考...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <Input
          placeholder="请输入您的问题..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          style={{ width: '100%', paddingLeft: '12px' }}
          suffix={
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={handleSend}
              disabled={inputValue.trim() === '' || isLoading}
              size="small"
            />
          }
        />
      </div>
    </div>
  );
} 