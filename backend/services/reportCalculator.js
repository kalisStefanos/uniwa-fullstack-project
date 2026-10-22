export function calculateApartmentShares(apartments, expenses, categoryMap){
    const sharesByAptId = new Map(apartments.map(apt => [apt.id , 0]));

    for(const expense of expenses){
        const category = categoryMap.get(expense.categoryId);
        
        const scores = apartments.map(apt => ({
            aptId: apt.id,
            score: Number(category.areaWeight) * apt.area + Number(category.floorWeight) * apt.floor,
        }));

        const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
        if (totalScore === 0) continue; // avoid NaN from division by zero

        for (const { aptId, score } of scores) {
        const share = Number(expense.amount) * (score / totalScore);
        sharesByAptId.set(aptId, sharesByAptId.get(aptId) + share);
        }    
    }
    return Array.from(sharesByAptId, ([aptId, amount]) => ({
        aptId,
        amount: Math.round(amount * 100) / 100, // round to cents
    }));
}