import {PrismaClient} from '@prisma/client';
import {join} from 'node:path';
import {readFileSync} from 'node:fs';

export async function fakeUsers() {
  console.log('Seeding users...');
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  if (users.length > 0) {
    console.log('Users already seeded');
    return;
  }
  const pathFile = join(__dirname, 'assets/users.json');
  const data = readFileSync(pathFile, 'utf-8');
  const usersData = JSON.parse(data);
  console.log('Users data:', usersData);
  const usersToCreate = usersData.map((user: any) => ({
    email: user.email,
    name: user.name,
    password: user.password,
  }));
  await prisma.user.createMany({
    data: usersToCreate,
  });
  console.log('Users seeded');
  await prisma.$disconnect();
}

