export declare const authServices: {
    loginUser: (email: string, password: string) => Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
        };
    } | null>;
};
//# sourceMappingURL=auth.service.d.ts.map