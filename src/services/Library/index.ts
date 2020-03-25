import { NewBooksApiResponse, getNewBooks } from "@sqd-ffrog/react-native-jnu";
import {
  getThumbnailUriByIsbn,
  LibrarySeatsApiResponse,
  getLibrarySeats
} from "@sqd-ffrog/react-native-jnu/src/library";

export interface NewBook {
  thumbnailUri: string;
  id: number;
  isbn: string;
  author: string;
  publisher: string;
  title: string;
}

export interface BookResponse<DataT> {
  success: boolean;
  data?: DataT[];
}

export async function getNewBooksApi(
  max: number
): Promise<BookResponse<NewBook>> {
  const INITIAL_RESULT: BookResponse<NewBook> = {
    success: false
  };

  try {
    const newBooksApiResponse: NewBooksApiResponse = await getNewBooks(max);
    return {
      success: true,
      data: await Promise.all(
        newBooksApiResponse.list.map(
          async ({
            id,
            isbn,
            author,
            titleStatement: title,
            publication: publisher
          }): Promise<NewBook> => {
            return {
              author,
              title,
              isbn,
              id,
              publisher,
              thumbnailUri: await getThumbnailUriByIsbn(isbn)
            };
          }
        )
      )
    };
  } catch (err) {
    console.warn(err);
    return INITIAL_RESULT;
  }
}

export async function getLibrarySeatsApi(): Promise<LibrarySeatsApiResponse> {
  return getLibrarySeats();
}
