export const createDomainOwner = async (domainOwner, username, password) => {
    const url = "http://10.186.217.107:8080/domain-owner";

    const data = {
        CompanyDomain: domainOwner,
        Username: username,
        Password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        window.alert('Error creating domain owner:', error);
        return null;
    }
};