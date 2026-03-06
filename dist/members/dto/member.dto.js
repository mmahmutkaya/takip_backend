"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberDto = exports.InviteMemberDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class InviteMemberDto {
    email;
    role;
    title;
}
exports.InviteMemberDto = InviteMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ahmet@example.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InviteMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ProjectRole, default: client_1.ProjectRole.MEMBER }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ProjectRole),
    __metadata("design:type", String)
], InviteMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Yazilim Gelistirici' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InviteMemberDto.prototype, "title", void 0);
class UpdateMemberDto {
    role;
    title;
}
exports.UpdateMemberDto = UpdateMemberDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ProjectRole }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ProjectRole),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Kıdemli Gelistirici' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "title", void 0);
//# sourceMappingURL=member.dto.js.map