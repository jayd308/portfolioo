# Portfolio API

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register admin user | No |
| POST | /api/auth/login | Login & get JWT token | No |
| GET | /api/auth/me | Get current user | Yes |
| PUT | /api/auth/update | Update user profile | Yes |

### Profile
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/profile | Get profile | No |
| PUT | /api/profile | Update profile | Yes |
| PUT | /api/profile/social-links | Update social links | Yes |

### Skills
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/skills | Get all skills | No |
| POST | /api/skills | Create skill | Yes (Admin) |
| PUT | /api/skills/:id | Update skill | Yes (Admin) |
| DELETE | /api/skills/:id | Delete skill | Yes (Admin) |

### Projects
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/projects | Get all projects | No |
| GET | /api/projects/featured | Get featured projects | No |
| GET | /api/projects/:id | Get single project | No |
| POST | /api/projects | Create project | Yes (Admin) |
| PUT | /api/projects/:id | Update project | Yes (Admin) |
| DELETE | /api/projects/:id | Delete project | Yes (Admin) |

### Messages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/messages | Send message | No |
| GET | /api/messages | Get all messages | Yes (Admin) |
| PUT | /api/messages/:id/read | Mark as read | Yes (Admin) |
| DELETE | /api/messages/:id | Delete message | Yes (Admin) |

### Certificates
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/certificates | Get all certificates | No |
| POST | /api/certificates | Create certificate | Yes (Admin) |
| DELETE | /api/certificates/:id | Delete certificate | Yes (Admin) |

## Authentication
All authenticated requests require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## File Uploads
- Supported formats: JPEG, JPG, PNG, GIF, WebP
- Maximum size: 5MB
- Upload endpoint: POST with `multipart/form-data` and field name `image`
