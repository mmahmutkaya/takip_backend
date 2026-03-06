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
exports.UpdateMeetingDto = exports.CreateMeetingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMeetingDto {
    title;
    description;
    scheduledAt;
    location;
}
exports.CreateMeetingDto = CreateMeetingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sprint Planning' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Q1 sprint planlaması' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-10T10:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Toplantı Odası 1 veya https://meet.google.com/xyz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "location", void 0);
class UpdateMeetingDto {
    title;
    description;
    scheduledAt;
    location;
}
exports.UpdateMeetingDto = UpdateMeetingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sprint Planning' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Q1 sprint planlaması' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-03-10T10:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Toplantı Odası 1 veya https://meet.google.com/xyz' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "location", void 0);
//# sourceMappingURL=meeting.dto.js.map