class Pagination:
    def __init__(self, data=None, page_capacity=10):
        self.items = data if data is not None else []
        self.page_size = int(page_capacity)
        self.current_idx = 0
        self.total_pages = (len(self.items) + self.page_size - 1) // self.page_size if self.items else 1

    def get_visible_items(self):
        offset = self.current_idx * self.page_size
        return self.items[offset:offset + self.page_size]

    def go_to_page(self, page_number):
        page_number = int(page_number)
        if 1 <= page_number <= self.total_pages:
            self.current_idx = page_number - 1
        else:
            print(f"The page number is incorrect. Please select a number between 1 {self.total_pages}.")

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = max(0, self.total_pages - 1)
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def display_current_page(self):
        return "\n".join(map(str, self.get_visible_items()))