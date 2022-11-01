/** Types generated for queries found in "src/domains/users/sql/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'GetPasswordByEmail' parameters type */
export interface IGetPasswordByEmailParams {
  email: string | null | void;
}

/** 'GetPasswordByEmail' return type */
export interface IGetPasswordByEmailResult {
  password: string | null;
}

/** 'GetPasswordByEmail' query type */
export interface IGetPasswordByEmailQuery {
  params: IGetPasswordByEmailParams;
  result: IGetPasswordByEmailResult;
}

const getPasswordByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":41,"b":46}]}],"statement":"SELECT password FROM users WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT password FROM users WHERE email = :email
 * ```
 */
export const getPasswordByEmail = new PreparedQuery<IGetPasswordByEmailParams,IGetPasswordByEmailResult>(getPasswordByEmailIR);


/** 'FindUserById' parameters type */
export interface IFindUserByIdParams {
  id: string | null | void;
}

/** 'FindUserById' return type */
export interface IFindUserByIdResult {
  created_at: Date;
  email: string;
  id: string;
  last_updated: Date;
  metadata: Json;
}

/** 'FindUserById' query type */
export interface IFindUserByIdQuery {
  params: IFindUserByIdParams;
  result: IFindUserByIdResult;
}

const findUserByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":75,"b":77}]}],"statement":"SELECT id, email, created_at, last_updated, metadata FROM users WHERE id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, created_at, last_updated, metadata FROM users WHERE id = :id
 * ```
 */
export const findUserById = new PreparedQuery<IFindUserByIdParams,IFindUserByIdResult>(findUserByIdIR);


/** 'FindUserByEmail' parameters type */
export interface IFindUserByEmailParams {
  email: string | null | void;
}

/** 'FindUserByEmail' return type */
export interface IFindUserByEmailResult {
  created_at: Date;
  email: string;
  id: string;
  last_updated: Date;
  metadata: Json;
}

/** 'FindUserByEmail' query type */
export interface IFindUserByEmailQuery {
  params: IFindUserByEmailParams;
  result: IFindUserByEmailResult;
}

const findUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":78,"b":83}]}],"statement":"SELECT id, email, created_at, last_updated, metadata FROM users WHERE email = :email"};

/**
 * Query generated from SQL:
 * ```
 * SELECT id, email, created_at, last_updated, metadata FROM users WHERE email = :email
 * ```
 */
export const findUserByEmail = new PreparedQuery<IFindUserByEmailParams,IFindUserByEmailResult>(findUserByEmailIR);


/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  email: string | null | void;
  metadata: Json | null | void;
  password: string | null | void;
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  created_at: Date;
  email: string;
  id: string;
  last_updated: Date;
  metadata: Json;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"email":true,"password":true,"metadata":true},"params":[{"name":"email","required":false,"transform":{"type":"scalar"},"locs":[{"a":54,"b":59}]},{"name":"password","required":false,"transform":{"type":"scalar"},"locs":[{"a":62,"b":70}]},{"name":"metadata","required":false,"transform":{"type":"scalar"},"locs":[{"a":73,"b":81}]}],"statement":"INSERT INTO users (email, password, metadata) VALUES (:email, :password, :metadata) RETURNING id, email, created_at, last_updated, metadata"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO users (email, password, metadata) VALUES (:email, :password, :metadata) RETURNING id, email, created_at, last_updated, metadata
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


