export class Api {
  static baseUrl = "http://localhost:5001";

  static postUser = async (params) => {
    try {
      const query = new URLSearchParams({ email: params.email }).toString();
      const user = await fetch(`${Api.baseUrl}/users?${query}`).then((response) =>
        response.json()
      );
      if (user[0]?.id) {
        throw { message: "Пользователь уже существует" };
      } else {
        const response = await fetch(`${Api.baseUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        });
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  static getUser = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${Api.baseUrl}/users?${query}`);
      const data = await response.json();
      if (!data[0]?.id) {
        throw { message: "Неверный пароль или email" };
      }
      return data[0];
    } catch (error) {
      throw error;
    }
  };

  static getNotes = async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${Api.baseUrl}/notes?${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  static deleteNote = async (id) => {
    try {
      const response = await fetch(`${Api.baseUrl}/notes/${id}`, { method: "DELETE" });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  static putNote = async ({ title, id, content, userId }) => {
    try {
      const response = await fetch(`${Api.baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId, createdAt: Date.now() }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  static postNote = async ({ title, content, userId }) => {
    console.log(content);
    try {
      const response = await fetch(`${Api.baseUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId, createdAt: Date.now() }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
}
