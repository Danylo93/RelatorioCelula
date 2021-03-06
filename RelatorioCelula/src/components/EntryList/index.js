import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native';

import Container from '../Core/Container';

import EntryListItem from './EntryListItem';

import {getEntries} from '../../services/Entries';

const EntryList = ({days = 7, category, onEntryPress, onPressActionButton}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      const data = await getEntries(days, category);
      setEntries(data);
    }

    loadEntries();

    console.log('EntryList :: useEffect');
  }, [days, category]);

  return (
    <ScrollView>
      <Container
        title="Últimos lançamentos"
        actionLabelText={`Ultimos ${days} dias`}
        actionButtonText="Ver mais"
        onPressActionButton={onPressActionButton}>
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <EntryListItem
              entry={item}
              isFirstItem={index === 0}
              isLastItem={index === entries.length - 1}
              onEntryPress={onEntryPress}
            />
          )}
        />
      </Container>
    </ScrollView>
  );
};

export default EntryList;
