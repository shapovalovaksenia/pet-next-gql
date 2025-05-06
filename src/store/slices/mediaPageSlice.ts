import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { MediaSort } from "@/graphql/generated/anilist";
import { DEFAULT_ANIME_PAGE_SIZE } from "@/shared/constant";

interface MediaPageState {
  currentPage: number;
  pageSize: number;
  sort: MediaSort | null;
}

const initialState: MediaPageState = {
  currentPage: 1,
  pageSize: DEFAULT_ANIME_PAGE_SIZE,
  sort: MediaSort.ScoreDesc,
};

const mediaPageSlice = createSlice({
  name: "mediaPage",
  initialState,
  reducers: {
    setMediaCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setMediaPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },

    setMediaSort(state, action: PayloadAction<MediaSort | null>) {
      state.sort = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setMediaCurrentPage, setMediaPageSize, setMediaSort } =
  mediaPageSlice.actions;

export const selectMediaCurrentPage = (state: RootState): number =>
  state.mediaPage.currentPage;
export const selectMediaPageSize = (state: RootState): number =>
  state.mediaPage.pageSize;
export const selectMediaSort = (state: RootState): MediaSort | null =>
  state.mediaPage.sort;

export default mediaPageSlice.reducer;
