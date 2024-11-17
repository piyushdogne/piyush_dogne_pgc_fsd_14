import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ category, page = 1, limit = 50, search = "" }, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * limit;
      const url = category
        ? `https://openlibrary.org/subjects/${category}.json?limit=${limit}&offset=${offset}`
        : `https://openlibrary.org/subjects/science_fiction.json?limit=${limit}&offset=${offset}`;

      const response = await axios.get(url);
      const apiBooks = response.data.works.map((work) => ({
        id: work.key.replace("/works/", ""),
        title: work.title,
        author: work.authors?.[0]?.name || "Unknown",
        coverImage: work.cover_id
          ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
          : null,
      }));

      const localBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
      const localBooksForCategory = localBooks.filter(
        (book) => book.category === category
      );

      return [
        ...localBooksForCategory,
        ...apiBooks.filter(
          (apiBook) =>
            !localBooksForCategory.some(
              (localBook) => localBook.id === apiBook.id
            )
        ),
      ];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch books");
    }
  }
);

export const fetchBooksByCategories = createAsyncThunk(
  "books/fetchBooksByCategories",
  async (categories, { rejectWithValue }) => {
    try {
      const categorizedBooks = await Promise.all(
        categories.map(async (category) => {
          const response = await axios.get(
            `https://openlibrary.org/subjects/${category}.json?limit=7`
          );
          return {
            category,
            books: response.data.works.map((work) => ({
              id: work.key.replace("/works/", ""),
              title: work.title,
              author: work.authors?.[0]?.name || "Unknown",
              coverImage: work.cover_id
                ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
                : null,
            })),
          };
        })
      );

      return categorizedBooks.reduce((acc, { category, books }) => {
        acc[category] = books;
        return acc;
      }, {});
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch books");
    }
  }
);

export const fetchNewlyAddedBooks = createAsyncThunk(
  "books/fetchNewlyAddedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
      return userBooks;
    } catch (error) {
      return rejectWithValue("Failed to fetch newly added books from localStorage");
    }
  }
);


export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const userBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
      const existingBook = userBooks.find((book) => book.id === id);

      if (existingBook) {
        return existingBook;
      }
      const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
      const { title, description, covers, authors } = response.data;

      let authorDetails = "Unknown author";
      if (authors && authors.length > 0) {
        const authorResponses = await Promise.all(
          authors.map((author) =>
            axios.get(`https://openlibrary.org${author.author.key}.json`)
          )
        );
        authorDetails = authorResponses.map((res) => res.data.name).join(", ");
      }

      const coverImage = covers
        ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
        : "https://via.placeholder.com/150";

      const bookDescription =
        typeof description === "string"
          ? description
          : description?.value || "No description available.";
      const randomRating = (Math.random() * (5 - 1) + 1).toFixed(1);

      return {
        id,
        title,
        author: authorDetails,
        coverImage,
        description: bookDescription,
        averageRating: randomRating, 
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch book details");
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [], // List of books for the category or search results
    categorizedBooks: {}, // Books organized by categories
    currentBook: null, // Book details for the View Details page
    status: "idle", // General status for loading
    error: null, // General error message
  },
  reducers: {
    clearCurrentBook(state) {
      state.currentBook = null; // Clear the current book details
    },
    addBook(state, action) {
      // Add to Redux state
      state.list.push(action.payload);
    
      // Save to local storage
      const existingBooks = JSON.parse(localStorage.getItem("userBooks")) || [];
      localStorage.setItem("userBooks", JSON.stringify([...existingBooks, action.payload]));
    },
    
  },
  extraReducers: (builder) => {
    // Fetch books by category or search
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetch books by categories
    builder
      .addCase(fetchBooksByCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooksByCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categorizedBooks = action.payload;
      })
      .addCase(fetchBooksByCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetch a single book by ID
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.currentBook = null; // Reset current book while fetching

      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

      builder
      .addCase(fetchNewlyAddedBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewlyAddedBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newlyAddedBooks = action.payload;
      })
      .addCase(fetchNewlyAddedBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export const { clearBooks, clearCurrentBook, addBook } = booksSlice.actions;

export default booksSlice.reducer;
