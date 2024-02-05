const customFetch = async (url) => {
    try {
        if (!url) throw Error('Please enter a valid url!');

        // Info: simulate delay for the loader to show, change timeout value if annoying
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const res = await fetch(url);

        if (!res.ok) throw Error(res.statusText);

        return res.json();
    } catch (e) {
        // Info: we would probably do something more productive with this error in a real scenario
        console.error(`Oh no! Something happened ${e}`);
    }
}

export default customFetch;
