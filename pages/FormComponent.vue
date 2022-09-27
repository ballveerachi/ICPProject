<template>
  <!-- <div>{{ employees }}</div> -->
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">ข้อมูลส่วนตัว</h3>
    </div>
    <div class="panel-body">
    <div>
      <form
        @submit.prevent="submitForm"
        @reset.prevent="resetForm"
        method="post"
      >
        <div class="row">
          <div class="input-field col s4">
            <label for="emp-id">EP-ID/รหัส:</label>
            <input
              type="text"
              name="emp-id"
              v-model="employee.id"
              placeholder="Id/รหัส"
              required  disabled
              class="form-control form-control-lg"
            />
          </div>
          <div class="input-field col s4">
            <label for="emp-name">Name/ชื่อ-สกุล:</label>
            <input
              type="text"
              name="emp-name"
              v-model="employee.name"
              placeholder="Name/ชื่อ-สกุล"
              required  disabled
              class="form-control form-control-lg"
            />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4" style="width: 300px">
            <label for="emp-Department">Department/สาขาวิชา:</label>
            <input
              type="text"
              name="emp-Department"
              v-model="employee.study_faculty"
              placeholder="Department/สาขาวิชา"
              class="form-control form-control-lg"
            />
            <select :size="4" v-model="employee.study_faculty">
              <option value="" disabled selected>สำเร็จการศึกษาสาขา:</option>
              <option value="การบริหารจัดการ">การบริหารจัดการ</option>
              <option value="การตลาด">การตลาด</option>
              <option value="การเงินและบัญชี">การเงินและบัญชี</option>
              <option value="การนโยบายและแผน">การนโยบายและแผน</option>
              <option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</option>
            </select>
          </div>
          <div class="input-field col s4" style="width: 300px">
            <label for="emp-University">University/สถาบันการศึกษา:</label>
            <input
              type="text"
              name="emp-University"
              v-model="employee.university"
              placeholder="University/สถาบันการศึกษา"
              class="form-control form-control-lg"
            />
            <select :size="4" v-model="employee.university">
              <option value="" disabled selected>สำเร็จการศึกษาสถาบัน:</option>
              <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
              <option value="มหาวิทยาลัยแม่โจ้">มหาวิทยาลัยแม่โจ้</option>
              <option value="มหาวิทยาลัยราชภัฏเชียงใหม่">
                มหาวิทยาลัยราชภัฏเชียงใหม่
              </option>
              <option value="วิทยาลัยเทคโนโลยีราชมงคล">
                วิทยาลัยเทคโนโลยีราชมงคล
              </option>
              <option value="วิทยาลัยเทคนิคเชียงใหม่">
                วิทยาลัยเทคนิคเชียงใหม่
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <label for="emp-disibility-type">Disability/ความบกพร่อง:</label>
            <input
              type="text"
              name="emp-disibility-type"
              v-model="employee.disability_type"
              placeholder="Disability/ความบกพร่อง]"
              class="form-control form-control-lg"
            />
            <select :size="4" v-model="employee.disability_type">
              <option value="" disabled selected>
               ความบกพร่องทาง:
              </option>
              <option value="การเห็น">การเห็น</option>
              <option value="การได้ยิน">การได้ยิน</option>
              <option value="สติปัญญา">สติปัญญา</option>
              <option value="ร่างกาย">
                ร่างกาย หรือการเคลื่อนไหว หรือสุขภาพ
              </option>
              <option value="การเรียนรู้">การเรียนรู้</option>
              <option value="การพูด">การพูด และภาษา</option>
              <option value="พฤติกรรม">พฤติกรรม หรืออารมณ์</option>
              <option value="ออทิสติก">ออทิสติก</option>
              <option value="พิการซ้อน">พิการซ้อน</option>
            </select>
          </div>
        </div>
        <div class="form-contol">
          <!-- <button>Save/บันทึก</button> -->
          <input type="submit" value="Save/บันทึก" class="btn btn-success" />
          <input type="reset" value="Cancel/ยกเลิก" class="btn btn-danger" />
        </div>
      </form>
      </div>
      <div>
        <table class="table">
      <thead>
        <tr>
          <th scope="col">EP-ID</th>
          <th scope="col">Name</th>
          <th scope="col">Study Faculty</th>
          <th scope="col">University</th>
          <th scope="col">Disibility type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in employees" :key="row.index">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.study_faculty }}</td>
          <td>{{ row.university }}</td>
          <td>{{ row.disability_type }}</td>
          <td>
            <button class="btn btn-primary" @click="editUser(row.id)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteUser(row.id)">
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
      </div>
    </div>
  </div>

  <!-- <div class="py-2">
    {{ employees_ }}
  </div>
  <div class="py-2">
    {{ employee }}
  </div> -->
  <!-- <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">EP-ID</th>
          <th scope="col">Name</th>
          <th scope="col">Study Faculty</th>
          <th scope="col">University</th>
          <th scope="col">Disibility type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in employees" :key="row.index">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.study_faculty }}</td>
          <td>{{ row.university }}</td>
          <td>{{ row.disability_type }}</td>
          <td>
            <button class="btn btn-primary" @click="editUser(row.id)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteUser(row.id)">
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div> -->

</template>

<script>
import axios from "axios";


export default {
  name: "FormComponent",
  data() {
    return {
      message: "Form Component (แบบฟอร์มบันทึกข้อมูล)",
      employees: Array,
      employees_: Array,
      employee: {
        id:this.$store.getters.myMember_id , 
        name:this.$store.getters.myName , 
        study_faculty: "",
        university: "",
        disability_type: "",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.employee.id = 0;
      // this.employee.name = "";
      this.employee.study_faculty = "";
      this.employee.university = "";
      this.employee.disability_type = "";
      this.employee.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log("data-Y-Y",res.data);
          self.employees = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("Form employee:", this.employee);
        const newEmployee = {
          id: this.employee.id,
          name: this.employee.name,
          study_faculty: this.employee.study_faculty,
          university: this.employee.university,
          disibility_type: this.employee.disability_type,
          isVisible: this.employee.isVisible,
        };
        this.$emit("saveData",newEmployee);

        axios
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "insert",
            id: this.employee.id,
            name: this.employee.name,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disibility_type: this.employee.disability_type,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "update",
            id: this.employee.id,
            name: this.employee.name,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disability_type: this.employee.disability_type,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editUser(id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api.php", {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log(response);
          self.employee.id = response.data.id;
          self.employee.name = response.data.name;
          self.employee.study_faculty = response.data.study_faculty;
          self.employee.university = response.data.university;
          self.employee.disability_type = response.data.disability_type;
          self.employees_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(id) {
      if (confirm("คุณต้องการลบรหัส " + id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "delete",
            id: id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getAllUser();
  },
};
</script>

<style scoped>
h3 {
  color: #2f855a;
}
select {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}

label {
  color: #2f855a;
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  cursor: pointer;
  padding: 0.05rem 1rem;
  border-radius: 15px;
}
</style>
