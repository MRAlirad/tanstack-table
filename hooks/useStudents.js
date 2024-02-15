import useSWR, {mutate} from 'swr';

const url = 'http://localhost:5000/students';

const getRequest = async () => {
    const response = await fetch(url);
    return response.json();
};

const updateRequest = async (id, data) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

const useStudents = () => {
    const {data, isValidating} = useSWR(url, getRequest);

    const updateRow = async (id, postData) => {
        await updateRequest(id, postData);
        mutate(url);
    };

    return {
        data: data ?? [],
        isValidating,
        updateRow,
    };
};

export default useStudents;