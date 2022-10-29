/** Types generated for queries found in "src/domains/users/sql/queries.sql" */
import { PreparedQuery } from '@pgtyped/query';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

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


