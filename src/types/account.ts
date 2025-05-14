export interface Account {
    id: string;
    labelTags: { text: string }[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
}