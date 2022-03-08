import jwt from 'jsonwebtoken'

/**
 * Generate a Json Web Token
 * @param uid 
 * @returns 
 */
export const getJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: '8h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};