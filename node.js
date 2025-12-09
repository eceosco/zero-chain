#!/usr/bin/env node
const crypto = require('crypto');
const ed = require('tweetnacl');

// Генерация ключей
const keypair = ed.sign.keyPair();
const publicKey = Buffer.from(keypair.publicKey).toString('hex');
const secretKey = keypair.secretKey;

console.log("ZERO-CHAIN НОДА ЗАПУЩЕНА");
console.log("Твой адрес:", publicKey.slice(0, 16) + "...");
console.log("Нод онлайн. Интернет — всё, что нужно.\n");

let balance = 1000000000n;  // 1 млрд ZERO (генезис для первой тысячи нод)
let txCount = 0;

// Имитация входящих транзакций каждые 300 мс
setInterval(() => {
  txCount++;
  const fakeTx = crypto.randomBytes(32).toString('hex').slice(0, 8);
  console.log(`Транзакция #\( {txCount} \){fakeTx}... подтверждена за 280 мс`);
  if (txCount % 77 === 0) balance += 1000000n;
}, 300);

// Статистика каждые 10 сек
setInterval(() => {
  const tps = (txCount / 10).toFixed(1);
  console.log(`TPS: \( {tps} | Баланс: \){(Number(balance)/1e9).toFixed(3)} ZERO\n`);
  txCount = 0;
}, 10000);