
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Link {
    title: string;
    destination: string;
    description?: string;
    addedTs: string;
}

export class Click {
    linkId: string;
    clickedTs: string;
    ipAddress?: string;
    language?: string;
    userAgent?: string;
    country?: string;
    region?: string;
    city?: string;
}

export class Settings {
    userId: string;
    slug: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
}

export class User {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    authorized: boolean;
}

export abstract class IQuery {
    abstract findAllLinks(): Link[] | Promise<Link[]>;

    abstract findLinkByTitle(title: string): Link | Promise<Link>;

    abstract findLinkByDestination(destination: string): Link | Promise<Link>;

    abstract findAllClicks(): Click[] | Promise<Click[]>;

    abstract findAllClicksByLinkId(linkId: string): Click[] | Promise<Click[]>;

    abstract findUserByGoogleId(googleId: string): User | Promise<User>;

    abstract findAuthorizedUser(googleId: string, authorized: boolean): User | Promise<User>;

    abstract findSettingsByUserId(userId: string): Settings | Promise<Settings>;
}
