#!/usr/bin/env bash
# Takip Backend - Başlangıç scripti
set -e

echo "==> Docker ile PostgreSQL başlatılıyor..."
docker-compose up -d postgres

echo "==> PostgreSQL hazır olana kadar bekleniyor..."
sleep 3

echo "==> Prisma migration çalıştırılıyor..."
npx prisma migrate dev --name init

echo "==> Prisma client oluşturuluyor..."
npx prisma generate

echo "==> Backend başlatılıyor..."
npm run start:dev
