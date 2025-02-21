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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        }

        if (response.status === 409) {
            window.alert('Conflict: Domain owner already exists');
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        window.alert('Error creating domain owner:', error);
        return null;
    }
};

export const Login = async (domainOwner, username, password) => {
    const url = "http://10.186.217.107:8080/domain-owner/login";

    const data = {
        CompanyDomain: domainOwner,
        Username: username,
        Password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        }

        if (response.status === 401) {
            window.alert('Invalid credentials');
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        window.alert('Error creating domain owner:', error);
        return null;
    }
};

export const getDomainOwner = async () => {
    const url = "http://10.186.217.107:8080/domain-owner/access";

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        }

        if (response.status === 401) {
            window.alert('Invalid credentials');
        } else {
            throw new Error('Network response was not ok');
        }

    } catch (error) {
        window.alert('Session timeout');
        return null;
    }
};