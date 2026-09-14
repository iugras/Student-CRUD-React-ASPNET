import { useEffect, useState } from "react";
import axios from "axios";

function StudentCrud() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await axios.get("https://localhost:7224/api/controller/GetStudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  }

  // Add or Update student
  async function save(event) {
    event.preventDefault();

    try {
      if (id === "") {
        // ADD
        await axios.post("https://localhost:7224/api/controller/AddStudent", {
          name,
          course,
        });
        alert("Student added successfully");
      } else {
        // UPDATE
        await axios.put(`https://localhost:7224/api/controller/UpdateStudent/${id}`, {
          id,
          name,
          course,
        });
        alert("Student updated successfully");
      }

      // Reset form
      setId("");
      setName("");
      setCourse("");

      // Refresh list
      fetchStudents();

    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  }

  // Delete student
  async function deleteStudent(studentId) {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`https://localhost:7224/api/controller/DeleteStudent/${studentId}`);
      alert("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  // Load student data into form for update
  function editStudent(student) {
    setId(student.id);
    setName(student.name);
    setCourse(student.course);
  }

  return (
    <div className="container mt-4">
      <h1 className="text-danger display-4">Student Details</h1>

      <form onSubmit={save}>
        <input type="hidden" value={id} />

        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label>Course</label>
          <input
            type="text"
            className="form-control"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {id === "" ? "Save" : "Update"}
        </button>
      </form>

      <hr />

      <h3 className="mt-4">Students List</h3>

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editStudent(s)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentCrud;
