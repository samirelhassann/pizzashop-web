/**
 * Make some properties required on type
 *
 * @example
 * ```typescript
 * type User {
 *  id?: string;
 *  name?: string;
 *  email?: string;
 * }
 *
 * Required<User, 'id' | 'email'>
 * ```
 * */

export type Required<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
