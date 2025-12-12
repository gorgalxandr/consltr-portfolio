# Onzoe Voice AI API Documentation

## Overview

The Onzoe Voice AI API provides enterprise-grade voice processing capabilities including:
- Real-time voice conversation through WebSockets
- Text-to-Speech (TTS) synthesis
- AI-powered business coaching
- JWT-based authentication and authorization
- Ultra-low latency voice pipeline (<200ms target)

## Base URL

All API requests should be made to:
```
https://onzoe.com/api/
```

**Security Note**: Direct access to api.onzoe.com is restricted. All requests must go through the secure Gateway at onzoe.com.

## Authentication

### Generate JWT Token

Generate a JWT token for API access:

**Endpoint**: `POST /v1/auth/token`

**Request Body**:
```json
{
  "app": "your-app-name",
  "user_id": "unique-user-identifier",
  "device_id": "unique-device-identifier",
  "permissions": ["coach", "tts", "voice"]
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 31536000
}
```

**Headers for Authenticated Requests**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

## Text-to-Speech API

Convert text to natural speech audio.

**Endpoint**: `POST /v1/tts`

**Request Body**:
```json
{
  "text": "Hello, this is a test of our voice AI system",
  "voice_id": "alloy",
  "model": "tts-1",
  "response_format": "mp3",
  "speed": 1.0
}
```

**Parameters**:
- `text` (required): Text to convert to speech
- `voice_id` (optional): Voice identifier ("alloy", "echo", "fable", "onyx", "nova", "shimmer")
- `model` (optional): TTS model ("tts-1" or "tts-1-hd")
- `response_format` (optional): Audio format ("mp3", "opus", "aac", "flac")
- `speed` (optional): Speech speed (0.25 to 4.0)

**Response**: Binary audio data

**Rate Limits**: 10 requests per minute

## AI Coach API

Get AI-powered business and life coaching responses.

**Endpoint**: `POST /v1/coach`

**Request Body**:
```json
{
  "message": "What strategies should I use to scale my SaaS business?",
  "context": "I'm running a voice AI startup with 50 users",
  "max_tokens": 500
}
```

**Response**:
```json
{
  "success": true,
  "response": "To scale your voice AI SaaS business effectively...",
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 127,
    "total_tokens": 172
  }
}
```

**Rate Limits**: 5 requests per minute

## Real-time Voice Streaming

For real-time voice conversations, use WebSocket connections.

**WebSocket URL**: `wss://onzoe.com/api/v1/voice/stream`

**Connection Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Upgrade: websocket
Connection: Upgrade
```

**Message Format** (Client to Server):
```json
{
  "type": "audio_chunk",
  "data": "base64_encoded_audio_data",
  "format": "pcm_s16le",
  "sample_rate": 16000,
  "channels": 1
}
```

**Message Format** (Server to Client):
```json
{
  "type": "audio_response",
  "data": "base64_encoded_audio_response",
  "transcript": "User said: Hello there",
  "ai_response": "Hello! How can I help you today?",
  "session_id": "sess_abc123",
  "latency_ms": 180
}
```

**Supported Audio Formats**:
- PCM S16LE, 16kHz, mono (recommended for lowest latency)
- WAV, MP3, FLAC (auto-converted)

**Rate Limits**: 50 messages per minute

## Health Check

Monitor API service health:

**Endpoint**: `GET /health`

**Response**:
```json
{
  "ok": true,
  "service": "onzoe-voice-ai-backend",
  "version": "1.0.0",
  "environment": "production",
  "uptime_seconds": 3600,
  "services": {
    "database": true,
    "redis": true,
    "voice_pipeline": true,
    "audio_codec": true
  },
  "voice_metrics": {
    "total_latency": {"avg": 185, "min": 120, "max": 250, "count": 1500},
    "stt_latency": {"avg": 45, "min": 30, "max": 80, "count": 1500},
    "ai_latency": {"avg": 95, "min": 60, "max": 150, "count": 1500},
    "tts_latency": {"avg": 45, "min": 30, "max": 90, "count": 1500}
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Invalid or missing JWT token |
| 403  | Forbidden - Insufficient permissions |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |
| 503  | Service Unavailable - Backend services down |

## Rate Limiting

The API implements enterprise-grade rate limiting:

- **Authentication**: 10 requests per minute
- **TTS**: 10 requests per minute  
- **Voice Streaming**: 50 messages per minute
- **Coach**: 5 requests per minute
- **General API**: 20 requests per minute

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 8
X-RateLimit-Reset: 1609459200
```

## Security Features

- **JWT Authentication**: All requests require valid JWT tokens
- **IP Allowlisting**: Backend services only accept requests from authorized gateways
- **Rate Limiting**: Prevents abuse and ensures service availability
- **Input Validation**: All inputs are sanitized and validated
- **Audit Logging**: All API requests are logged for security monitoring
- **HTTPS Only**: All traffic is encrypted in transit

## SDKs and Examples

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

// Generate JWT token
const response = await axios.post('https://onzoe.com/api/v1/auth/token', {
  app: 'my-voice-app',
  user_id: 'user-123',
  device_id: 'device-456'
});

const token = response.data.token;

// Use TTS
const ttsResponse = await axios.post('https://onzoe.com/api/v1/tts', {
  text: 'Hello from Onzoe Voice AI!',
  voice_id: 'alloy'
}, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  responseType: 'arraybuffer'
});

// Save audio file
const fs = require('fs');
fs.writeFileSync('output.mp3', Buffer.from(ttsResponse.data));
```

### Python Example

```python
import requests
import json

# Generate JWT token
response = requests.post('https://onzoe.com/api/v1/auth/token', json={
    'app': 'my-voice-app',
    'user_id': 'user-123',
    'device_id': 'device-456'
})

token = response.json()['token']

# Use Coach API
coach_response = requests.post('https://onzoe.com/api/v1/coach', 
    json={'message': 'How do I improve team productivity?'},
    headers={'Authorization': f'Bearer {token}'}
)

print(coach_response.json()['response'])
```

## Support

For technical support and API questions:
- Email: support@onzoe.com
- Documentation: https://docs.onzoe.com
- Status Page: https://status.onzoe.com

---
*Last updated: 2025-11-02*
*API Version: 1.0.0*