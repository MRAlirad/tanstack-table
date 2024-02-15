import useSWR, {mutate} from 'swr';

const url = 'http://localhost:5000/students';

const getRequest = async () => {
    const response = await fetch(url);
    return response.json();
};

const useStudents = () => {
    const {data, isValidating} = useSWR(url, getRequest);

    return {
        data: data ?? [],
        isValidating,
    };
};

export default useStudents;