import { trustyFetch } from "../fetch";
import { dateToString } from "@sqd-ffrog/tools";
import iconv from "iconv-lite";
import { Buffer } from "buffer";

// TODO: d.ts를 만들어주기
const cheerio = require("react-native-cheerio");

interface BiblioType {
  id: number;
  name: string;
  imageMapOffset: number;
}

interface BranchVolumesType {
  cState: string;
  hasItem: boolean;
  id: number;
  isCr: boolean;
  isSubscribed: false;
  name: string;
  volume: string;
}

interface SimilarBookType {
  id: number;
  titleStatement: string;
  publication: string;
}

interface NewBook {
  author: string;
  biblioType: BiblioType;
  branchVolumes: BranchVolumesType[];
  etcContent: string;
  id: number;
  isbn: string;
  issn: string | null;
  locationId: 35;
  // TODO : 뭐하는 놈인지 찾기.
  newResources: string | null;
  publication: string;
  resources: any[] | null;
  similars: SimilarBookType[];
  thumbnailUrl: string | null;
  titleStatement: string;
}

export interface NewBooksApiResponse {
  isFuzzy: boolean;
  totalCount: number;
  offset: number;
  max: number;
  abc: string | null;
  list: NewBook[];
}

interface NewBooksApiWrapper {
  success: boolean;
  code?: string;
  message: string;
  data?: NewBooksApiResponse;
}

export async function getThumbnailUriByIsbn(isbn: string): Promise<string> {
  // TODO: 현재 원인 불명으로 썸네일 작동 불능 중.
  // 제주대 기본 이미지로 대신 제공함.
  return "http://img.libbook.co.kr/V2/noimages/f1e824448e669ef592a1_noimg.gif";
  const uri = `https://ecip.libbook.co.kr/api/?isbn=${isbn}&pUniv=f1e824448e669ef592a1&returnType=json`;
  try {
    const res = await trustyFetch("GET", uri);

    if (res.info().status !== 200) {
      throw new Error("Can't connect getNewBoooks Api");
    }

    console.debug(res.text());
    return "dummy";
  } catch (err) {
    console.warn(err);
    return "err";
  }
}

export async function getNewBooks(size: number): Promise<NewBooksApiResponse> {
  const EMPTY_NEWBOOKS: NewBooksApiResponse = {
    isFuzzy: false,
    totalCount: 0,
    offset: 0,
    max: 0,
    abc: null,
    list: []
  };

  const date = new Date();
  const oneMonthBeforeDate = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );
  const uri = `https://lib.jejunu.ac.kr/pyxis-api/1/collections/4/search?date_received=[${dateToString(
    oneMonthBeforeDate
  )}%20TO%20${dateToString(date)}]&max=${size}`;
  console.debug("getNewBooks, uri :", uri);

  try {
    const res = await trustyFetch("GET", uri);
    console.debug("response :", res);
    if (res.info().status !== 200) {
      throw new Error("Can't connect getNewBoooks Api");
    }

    const json: NewBooksApiWrapper = res.json();
    if (!json.success) {
      throw new Error("getNewBooks failed");
    }

    return json?.data ?? EMPTY_NEWBOOKS;
  } catch (err) {
    console.warn(err);
    return EMPTY_NEWBOOKS;
  }
}

export interface LibrarySeatProps {
  id: number;
  sectionName: string;
  capacity: number;
  available: number;
}

export interface LibrarySeatsApiResponse {
  success: boolean;
  data?: LibrarySeatProps[];
  message?: string;
}

export async function getLibrarySeats(): Promise<LibrarySeatsApiResponse> {
  const uri = "http://203.253.194.135:8011/WebSeat/domian5.asp";
  try {
    const res = await trustyFetch("GET", uri);

    // if status isn't 200, throw error;
    if (res.info().status !== 200) {
      throw new Error(`Can't connect to address. Please contact to developer.`);
    }

    // resolve encoding issue.
    const bufferFromBase64 = Buffer.from(res.data, "base64");
    const body = iconv.decode(bufferFromBase64, "EUC-KR").toString();

    const $ = cheerio.load(body);

    const data: LibrarySeatProps[] = $("table")
      .eq(1)
      .find("tr")
      .slice(2)
      .toArray()
      .map((elem: any) => $(elem).find("td"))
      .map(
        (elem: any): LibrarySeatProps => ({
          id: parseInt(
            elem
              .eq(0)
              .text()
              .trim()
          ),
          sectionName: elem
            .eq(1)
            .text()
            .trim(),
          capacity: elem
            .eq(2)
            .text()
            .trim(),
          available: elem
            .eq(4)
            .text()
            .trim()
        })
      );

    console.debug("getLibrarySeats, data :", data);

    return librarySeatsApiResponseFactory("success", data);
  } catch (err) {
    console.warn(err);
    return librarySeatsApiResponseFactory(err);
  }

  // } catch (err) {
  //   console.warn(err);
  //   return librarySeatsApiResponseFactory(err);
  // }
  // let res = await fetch("GET", uri);
  // let haksa = {};
  // (haksa.title = "도서좌석"), (haksa.row = []);
  // try {
  //   let res = await RNFetchBlob.fetch("GET", uri);
  //   let strbase64 = new Buffer(res.data, "base64");
  //   let resBody = iconv.decode(strbase64, "EUC-KR").toString();
  //   let $ = cheerio.load(resBody);

  //   const data = $("table").eq(1).find("tr").
  // $("table")
  //   .eq(1)
  //   .find("tr")
  //   .each(function(tr) {
  //     if (tr >= 2) {
  //       let tempRow = { key: tr };
  //       $(this)
  //         .find("td")
  //         .each(function(td) {
  //           tempRow["table" + td] = $(this).text();
  //         });
  //       haksa.row.push(tempRow);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return err;
  // } finally {
  //   return haksa;
  // }
}

function librarySeatsApiResponseFactory(
  message: string,
  data?: LibrarySeatProps[]
): LibrarySeatsApiResponse {
  return {
    success: !!data,
    message,
    data
  };
}
