export const customFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const isFormData = options.body instanceof FormData;
    const hasBody = options.body != null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
            ...(hasBody && !isFormData ? { 'Content-Type': 'application/json' } : {}),
            ...options.headers,
        },
    });

    const data = response.status === 204 ? undefined : await response.json();

    return {
        data,
        status: response.status,
        headers: response.headers,
    } as T;
};
