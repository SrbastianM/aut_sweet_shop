export function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing env variable:  ${name}. Check .env or Github actions`);
    };

    return value;
}