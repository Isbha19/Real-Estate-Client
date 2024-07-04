export interface FacebookApi{
    
        init(params: { appId: string; version: string; cookie?: boolean; xfbml?: boolean }): void;
        login(callback: (response: any) => void, options?: any): void;
        logout(callback: (response: any) => void): void;
        api(path: string, method: 'get' | 'post' | 'delete', params?: any, callback?: (response: any) => void): void;
        getLoginStatus(callback: (response: any) => void): void;
      
}