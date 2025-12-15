import { LifeStats, StatsInput } from '../types/Stats';

export const calculateLifeStats = (input: StatsInput): LifeStats => {
    const birthDate = new Date(input.dateOfBirth);
    const now = new Date();
    
    const diffInMilliseconds = now.getTime() - birthDate.getTime();
    const hoursLived = Math.round(diffInMilliseconds / (1000 * 60 * 60) * 10) / 10;
    const daysLived = Math.round(hoursLived / 24 * 10) / 10;
    
    // 20세 이후 일수 계산 (커피 계산용)
    const age20Date = new Date(birthDate);
    age20Date.setFullYear(birthDate.getFullYear() + 20);
    
    let daysAfter20 = 0;
    if (now > age20Date) {
        const diffAfter20 = now.getTime() - age20Date.getTime();
        daysAfter20 = Math.round(diffAfter20 / (1000 * 60 * 60 * 24) * 10) / 10;
    }
    
    const totalCoffeeCups = Math.round(daysAfter20 * input.coffeeIntake * 10) / 10;
    const totalSleepHours = Math.round(hoursLived * (input.sleepHours / 24) * 10) / 10;
    const sleepPercentage = Math.round((input.sleepHours / 24) * 100 * 10) / 10;
    
    return {
        hoursLived,
        daysLived,
        totalCoffeeCups,
        totalSleepHours,
        sleepPercentage
    };
};