/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleViewQuery
// ====================================================

export interface ArticleViewQuery_getArticle_owner {
  __typename: "User";
  fullname: string;
  username: string;
}

export interface ArticleViewQuery_getArticle {
  __typename: "Article";
  title: string;
  creation_date: any;
  picture_url: string;
  text: string;
  owner: ArticleViewQuery_getArticle_owner;
}

export interface ArticleViewQuery {
  getArticle: ArticleViewQuery_getArticle | null;
}

export interface ArticleViewQueryVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetArticlesQuery
// ====================================================

export interface GetArticlesQuery_getArticles_owner {
  __typename: "User";
  username: string;
  email: string;
  fullname: string;
  register_date: any;
}

export interface GetArticlesQuery_getArticles {
  __typename: "Article";
  id: string;
  text: string;
  title: string;
  creation_date: any;
  picture_url: string;
  owner: GetArticlesQuery_getArticles_owner;
}

export interface GetArticlesQuery {
  getArticles: GetArticlesQuery_getArticles[];
}

export interface GetArticlesQueryVariables {
  limit: number;
  offset: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "Error";
  message: string;
  path: string;
}

export interface LoginMutation {
  login: LoginMutation_login[] | null;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register {
  __typename: "Error";
  path: string;
  message: string;
}

export interface RegisterMutation {
  register: RegisterMutation_register[] | null;
}

export interface RegisterMutationVariables {
  data: RegisterInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface RegisterInput {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
