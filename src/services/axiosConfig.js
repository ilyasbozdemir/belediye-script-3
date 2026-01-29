import axios from 'axios';
import mockAPI from './mockApi';

// Mock mode kontrolü - production'da false yapılabilir
const USE_MOCK_API = true;

if (USE_MOCK_API) {
    // Request interceptor - tüm API çağrılarını yakala
    axios.interceptors.request.use(
        async (config) => {
            // Eğer URL /api/ ile başlıyorsa mock API kullan
            if (config.url && config.url.startsWith('/api/')) {
                console.log(`🎭 Mock API: ${config.method.toUpperCase()} ${config.url}`);
                
                // Request'i iptal et ve mock response döndür
                config.adapter = async () => {
                    try {
                        let response;
                        
                        switch (config.method.toLowerCase()) {
                            case 'get':
                                response = await mockAPI.get(config.url);
                                break;
                            case 'post':
                                response = await mockAPI.post(config.url, config.data);
                                break;
                            case 'put':
                                response = await mockAPI.put(config.url, config.data);
                                break;
                            case 'delete':
                                response = await mockAPI.delete(config.url);
                                break;
                            default:
                                throw new Error(`Unsupported method: ${config.method}`);
                        }
                        
                        return {
                            data: response.data,
                            status: 200,
                            statusText: 'OK',
                            headers: {},
                            config,
                            request: {}
                        };
                    } catch (error) {
                        return Promise.reject({
                            response: {
                                data: { error: error.message },
                                status: 500,
                                statusText: 'Internal Server Error'
                            }
                        });
                    }
                };
            }
            
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor - hata durumlarını yönet
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('❌ API Error:', error);
            return Promise.reject(error);
        }
    );
}

export default axios;
