
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class ClickInput {
    clickedTs: string;
    ipAddress?: string;
    language?: string;
    userAgent?: string;
    country?: string;
    region?: string;
    city?: string;
    owner?: ClickOwnerRelation;
}

export class ClickOwnerRelation {
    create?: LinkInput;
    connect?: string;
}

export class LinkClicksRelation {
    create?: ClickInput[];
    connect?: string[];
    disconnect?: string[];
}

export class LinkInput {
    title: string;
    destination: string;
    description?: string;
    addedTs: string;
    active: boolean;
    deleted: boolean;
    clicks?: LinkClicksRelation;
    owner?: LinkOwnerRelation;
}

export class LinkOwnerRelation {
    create?: UserInput;
    connect?: string;
}

export class SettingsInput {
    slug: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    owner?: SettingsOwnerRelation;
}

export class SettingsOwnerRelation {
    create?: UserInput;
    connect?: string;
    disconnect?: boolean;
}

export class UserInput {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    authorized: boolean;
    settings?: UserSettingsRelation;
    links?: UserLinksRelation;
}

export class UserLinksRelation {
    create?: LinkInput[];
    connect?: string[];
    disconnect?: string[];
}

export class UserSettingsRelation {
    create?: SettingsInput;
    connect?: string;
}

export class Click {
    clickedTs: string;
    city?: string;
    _id: string;
    country?: string;
    userAgent?: string;
    language?: string;
    ipAddress?: string;
    region?: string;
    owner: Link;
    _ts: Long;
}

export class ClickPage {
    data: Click[];
    after?: string;
    before?: string;
}

export class Link {
    description?: string;
    _id: string;
    clicks: ClickPage;
    owner: User;
    title: string;
    destination: string;
    addedTs: string;
    deleted: boolean;
    active: boolean;
    _ts: Long;
}

export class LinkPage {
    data: Link[];
    after?: string;
    before?: string;
}

export abstract class IMutation {
    abstract updateUser(id: string, data: UserInput): User | Promise<User>;

    abstract createSettings(data: SettingsInput): Settings | Promise<Settings>;

    abstract createUser(data: UserInput): User | Promise<User>;

    abstract toggleActiveLink(id: string, active: boolean): Link | Promise<Link>;

    abstract updateLink(id: string, data: LinkInput): Link | Promise<Link>;

    abstract createClick(data: ClickInput): Click | Promise<Click>;

    abstract createLink(data: LinkInput): Link | Promise<Link>;

    abstract deleteLink(id: string): Link | Promise<Link>;

    abstract updateSettings(id: string, data: SettingsInput): Settings | Promise<Settings>;

    abstract softDeleteLink(id: string): Link | Promise<Link>;

    abstract updateClick(id: string, data: ClickInput): Click | Promise<Click>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract deleteClick(id: string): Click | Promise<Click>;

    abstract deleteSettings(id: string): Settings | Promise<Settings>;
}

export abstract class IQuery {
    abstract findLinksByOwner(_size?: number, _cursor?: string, owner: string): QueryFindLinksByOwnerPage | Promise<QueryFindLinksByOwnerPage>;

    abstract findAuthorizedUser(googleId: string, authorized: boolean): User | Promise<User>;

    abstract findUserByGoogleId(googleId: string): User | Promise<User>;

    abstract findLinksByTitle(_size?: number, _cursor?: string, owner: string, title: string): QueryFindLinksByTitlePage | Promise<QueryFindLinksByTitlePage>;

    abstract findLinkByID(id: string): Link | Promise<Link>;

    abstract findUserByID(id: string): User | Promise<User>;

    abstract findClickByID(id: string): Click | Promise<Click>;

    abstract clickCountByOwner(owner: string): number | Promise<number>;

    abstract findClicksByOwner(_size?: number, _cursor?: string, owner: string): QueryFindClicksByOwnerPage | Promise<QueryFindClicksByOwnerPage>;

    abstract findSettingsByID(id: string): Settings | Promise<Settings>;

    abstract findLinksByDestination(_size?: number, _cursor?: string, owner: string, destination: string): QueryFindLinksByDestinationPage | Promise<QueryFindLinksByDestinationPage>;
}

export class QueryFindClicksByOwnerPage {
    data: Click[];
    after?: string;
    before?: string;
}

export class QueryFindLinksByDestinationPage {
    data: Link[];
    after?: string;
    before?: string;
}

export class QueryFindLinksByOwnerPage {
    data: Link[];
    after?: string;
    before?: string;
}

export class QueryFindLinksByTitlePage {
    data: Link[];
    after?: string;
    before?: string;
}

export class Settings {
    youtube?: string;
    _id: string;
    logoUrl?: string;
    slug: string;
    facebook?: string;
    secondaryColor?: string;
    owner: User;
    twitter?: string;
    instagram?: string;
    primaryColor?: string;
    _ts: Long;
}

export class User {
    email: string;
    _id: string;
    authorized: boolean;
    lastName: string;
    links: LinkPage;
    firstName: string;
    googleId: string;
    settings?: Settings;
    _ts: Long;
}

export type Long = any;
export type Time = any;
