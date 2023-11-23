
export const getUsers = async () => {
    const res = await fetch("http://localhost:8080/admin/user/list", {
        method: "GET",
        headers: {
            "Authorization": "Bearer dfsdfsdsdfsfssfvgthgbh"
        }
    });
    return res.json();
}

export const getValidatingUser = async (retrieveToken: string | undefined) => {
    const res = await fetch(`http://localhost:8080/admin/user/validating/${retrieveToken}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer dfsdfsdsdfsfssfvgthgbh`
        }
    });

    return res.json();
}