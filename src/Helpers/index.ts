
// Replace with Alternatives (Temporary solution)
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

export const emailChecker = (email: string) => {

    return emailRegex.test(email)
}