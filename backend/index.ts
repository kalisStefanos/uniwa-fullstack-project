// npx ts-node index.ts
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function main(){
    
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

export default prisma;