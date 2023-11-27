import { db } from "./db";
import { emailVerificationToken, passwordResetToken } from "./authSchema";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { eq } from "drizzle-orm";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
  const storedUserTokens = await db
  .select().from(emailVerificationToken)
  .where(eq(emailVerificationToken.userId, userId));
  
  if (storedUserTokens.length > 0) {    
    const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
  
  const token = generateRandomString(63);
  
	await db
    .insert(emailVerificationToken)
    .values({
			id: token,
			expires: BigInt(new Date().getTime()) + BigInt(EXPIRES_IN),
			userId: userId
		});
    
	return token;
};

export const validateEmailVerificationToken = async (token: string) => {
 
  const storedToken = await db.transaction(async (trx) => {
    const storedToken = await trx
      .select()
      .from(emailVerificationToken)
      .where(eq(emailVerificationToken.id, token));
      
    if (!storedToken) throw new Error("Invalid token");
    await trx
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.id, token));
    
    return storedToken;
  });
  const tokenExpires = Number(storedToken[0].expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}
	return storedToken[0].userId;
}

export const generatePasswordResetToken = async (userId: string) => {
  // console.log("----> generatePasswordResetToken");
  // console.log("----> waiting for storedUserTones from DB")
  const storedUserTokens = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.userId, userId));
    
    // console.log("----> storedUserTokens", storedUserTokens);
    if (storedUserTokens.length > 0) {
      const reusableStoredToken = storedUserTokens.find((token) => {
        // check if expiration is within 1 hour
        // and reuse the token if true
        // console.log('----> is there a token here? ---->', token)
        return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
      });
      if (reusableStoredToken) return reusableStoredToken.id;
    }
    // console.log("----> generating new token");
    const token = generateRandomString(63);
    // console.log("----> inserting new token into DB")
    await db
      .insert(passwordResetToken)
      .values({
        id: token,
			  expires: BigInt(new Date().getTime()) + BigInt(EXPIRES_IN),
		  	userId: userId
      });
    // console.log("returning token", token)
    return token;
}

export const validatePasswordResetToken = async (token: string) => {
  const storedToken = await db.transaction(async (trx) => {
    // console.log("----> validatePasswordResetToken")
    const storedToken = await trx
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.id, token));
    // console.log("----> storedToken from validatePasswordToken", storedToken)
    if (!storedToken) throw new Error("Invalid token");
    await trx
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, token));
      
    return storedToken;
  
  });
  const tokenExpires = Number(storedToken[0].expires); // bigint => number conversion
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return storedToken[0].userId;
}

export const isValidPasswordResetToken = async (token: string) => {
  // console.log("----> isValidPasswordResetToken")
  const storedToken = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.id, token));
  // console.log("----> storedToken from isValidPasswordResetToken", storedToken)

  if (!storedToken) return false;

  const tokenExpires = Number(storedToken[0].expires); // bigint => number conversion
  // console.log("----> tokenExpires", tokenExpires)

  if (!isWithinExpiration(tokenExpires)) {
    
    return false;
  }
  return true
}