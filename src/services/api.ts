import axios from 'axios';

// DeepSeek API配置
const DEEPSEEK_API_URL = process.env.REACT_APP_DEEPSEEK_API_URL || 'https://api.deepseek.com';
const API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY || '';

// 创建axios实例
const apiClient = axios.create({
  baseURL: DEEPSEEK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// 接口定义
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  id: string;
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
}

// 发送聊天请求到DeepSeek API
export const sendChatRequest = async (messages: ChatMessage[], model: string = 'deepseek-chat') => {
  try {
    const payload: ChatCompletionRequest = {
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000
    };
    
    const response = await apiClient.post<ChatCompletionResponse>('/v1/chat/completions', payload);
    return response.data;
  } catch (error) {
    console.error('DeepSeek API请求失败:', error);
    throw error;
  }
};

// 提供获取可用模型的函数
export const getAvailableModels = async () => {
  try {
    const response = await apiClient.get('/v1/models');
    return response.data;
  } catch (error) {
    console.error('获取模型列表失败:', error);
    throw error;
  }
};

// 导出接口以供其他组件使用
export type { ChatMessage, ChatCompletionRequest, ChatCompletionResponse }; 