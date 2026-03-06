"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    config;
    mailService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(prisma, jwtService, config, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.mailService = mailService;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Bu e-posta zaten kayıtlı');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { name: dto.name, email: dto.email, passwordHash, isEmailVerified: false },
            select: { id: true, name: true, email: true, plan: true, isEmailVerified: true, createdAt: true },
        });
        await this.sendVerificationToken(user.id, dto.email, dto.name);
        return { message: 'Kayıt başarılı. E-posta adresinize doğrulama linki gönderildi.' };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Geçersiz e-posta veya şifre');
        }
        if (!user.isActive)
            throw new common_1.UnauthorizedException('Hesap devre dışı');
        if (!user.isEmailVerified) {
            throw new common_1.UnauthorizedException('E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.');
        }
        const tokens = await this.generateTokens(user.id, user.email);
        const { passwordHash, ...safeUser } = user;
        return { user: safeUser, ...tokens };
    }
    async verifyEmail(token) {
        const record = await this.prisma.emailVerification.findUnique({ where: { token } });
        if (!record)
            throw new common_1.BadRequestException('Geçersiz doğrulama linki');
        if (record.expiresAt < new Date()) {
            await this.prisma.emailVerification.delete({ where: { id: record.id } });
            throw new common_1.BadRequestException('Doğrulama linkinin süresi dolmuş. Yeni link talep edin.');
        }
        await this.prisma.user.update({
            where: { id: record.userId },
            data: { isEmailVerified: true },
        });
        await this.prisma.emailVerification.delete({ where: { id: record.id } });
        return { message: 'E-posta adresiniz başarıyla doğrulandı. Giriş yapabilirsiniz.' };
    }
    async resendVerification(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.NotFoundException('Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı');
        if (user.isEmailVerified)
            throw new common_1.ConflictException('E-posta adresi zaten doğrulanmış');
        await this.prisma.emailVerification.deleteMany({ where: { userId: user.id } });
        await this.sendVerificationToken(user.id, user.email, user.name);
        return { message: 'Doğrulama e-postası yeniden gönderildi.' };
    }
    async refresh(refreshToken) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Geçersiz refresh token');
        }
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
        const tokens = await this.generateTokens(stored.user.id, stored.user.email);
        const { passwordHash, ...safeUser } = stored.user;
        return { user: safeUser, ...tokens };
    }
    async logout(refreshToken) {
        await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    async sendVerificationToken(userId, email, name) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.prisma.emailVerification.create({ data: { token, userId, expiresAt } });
        try {
            await this.mailService.sendVerificationEmail(email, name, token);
        }
        catch (err) {
            this.logger.error(`Mail gönderilemedi [${email}]: ${err.message}`);
        }
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const accessToken = this.jwtService.sign(payload);
        const refreshTokenValue = this.jwtService.sign(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: { token: refreshTokenValue, userId, expiresAt },
        });
        return { accessToken, refreshToken: refreshTokenValue };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map