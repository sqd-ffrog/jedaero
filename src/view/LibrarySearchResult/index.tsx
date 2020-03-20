import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Card } from '@sqd-ffrog/components';

function LibrarySearchResult() {
  const navigation = useNavigation();
  return (
    <ScrollView title="정보">
      <Card></Card>
    </ScrollView>
  );
}

export default LibrarySearchResult;