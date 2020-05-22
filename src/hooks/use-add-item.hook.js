import { useState, useCallback } from 'react';

const useAddItem = (list, callback) => {
    const [itemList, setItemList] = useState(list);
    const addItemToList = useCallback((item) => setItemList(itemList.concat([item])), [itemList]);
    const updateListItem = useCallback((item, index) => {
        const items = itemList.slice();
        items[index].name = item;
        setItemList(items);
    }, [itemList]);
    return [itemList, setItemList, addItemToList, updateListItem];
};

export default useAddItem;