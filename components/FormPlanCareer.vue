<template>
  <div>
  <h3>แผนอาชีพ</h3>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="row">
      <div class="input-field col s4">
        <label for="planCareer-id">PC-ID/รหัสอาชีพ:</label>
        <input
          type="text"
          name="planCareer-id"
          v-model="planCareer.Plan_Career_id"
          placeholder="PC-ID/รหัสอาชีพ"
          required  disabled
          class="form-control form-control-lg"
        />
      </div>
      <div class="input-field col s4">
        <label for="Employee-id">EP-ID/รหัสพนักงาน:</label>
        <input
          type="text"
          name="Employee-id"
          v-model="planCareer.Employee_id"
          placeholder="EP-ID/รหัสพนักงาน"
          required  disabled
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <!-- :value="career.career_id" -->
    <div class="row">
      <div class="input-field col s4">
        <label for="PlanCareer-name">Plan Career/แผนอาชีพ:</label>
        <input
          type="text"
          name="PlanCareer-name"
          v-model="planCareer.Name_Plan_Career"
          placeholder="Plan Career/แผนอาชีพ"
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="planCareer.Name_Plan_Career">
          <option value="" disabled selected>อาชีพที่ต้องการ:</option>
          <option
            v-for="career in careers"
            :value="career.career"
            :key="career.index"
          >
            {{ career.career_id }} {{ career.career }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-contol">
      <!-- <button>Save data (บันทึกข้อมูล)</button> -->
      <input
        type="submit"
        value="Save data (บันทึกข้อมูล)"
        class="btn btn-success"
      />
      <input type="reset" value="Cancel (ยกเลิก)" class="btn btn-danger" />
    </div>
  </form>
  <!-- <div class="py-2">
    {{ planCareers_ }}
  </div>
  <div class="py-2">
    {{ planCareer }}
  </div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">PC-ID</th>
          <th scope="col">EP-ID</th>
          <th scope="col">Plan Career</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in planCareers" :key="row.index">
          <td>{{ row.Plan_Career_id }}</td>
          <td>{{ row.Employee_id }}</td>
          <td>{{ row.Name_Plan_Career }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="editUser(row.Plan_Career_id)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-warning"
              @click="deleteUser(row.Plan_Career_id)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "FormPlanCareer",
  data() {
    return {
      message: "Form Plan Career",
      planCareers: Array,
      planCareers_: Array,
      careers: Array,
      //Plan_Career_id	Employee_id	Name_Plan_Career Description
      planCareer: {
        Plan_Career_id: "",
        Employee_id: this.$store.getters.myMember_id,
        Name_Plan_Career: "",
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
      console.log("ยกเลิก");
      // this.planCareer.Plan_Career_id = 0;
      // this.planCareer.Employee_id = 0;
      this.planCareer.Name_Plan_Career = "";
      this.planCareer.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.planCareers = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.careers = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("Form Plan Career:", this.planCareer);
        const newPlanCareer = {
          Plan_Career_id: this.planCareer.Plan_Career_id,
          Employee_id: this.planCareer.Employee_id,
          Name_Plan_Career: this.planCareer.Name_Plan_Career,
          isVisible: this.planCareer.isVisible,
        };
        this.$emit("saveData", newPlanCareer);

        axios
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "insert",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Employee_id: this.planCareer.Employee_id,
            Name_Plan_Career: this.planCareer.Name_Plan_Career,
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
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "update",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Employee_id: this.planCareer.Employee_id,
            Name_Plan_Career: this.planCareer.Name_Plan_Career,
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
    editUser(Plan_Career_id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan-career.php", {
          action: "edit",
          Plan_Career_id: Plan_Career_id,
        })
        .then(function (response) {
          console.log(response);
          self.planCareer.Plan_Career_id = response.data.Plan_Career_id;
          self.planCareer.Employee_id = response.data.Employee_id;
          self.planCareer.Name_Plan_Career = response.data.Name_Plan_Career;

          self.planCareers_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(Plan_Career_id) {
      if (confirm("คุณต้องการลบรหัส " + Plan_Career_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "delete",
            Plan_Career_id: Plan_Career_id,
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
    this.getCareer();
  },
};
</script>

<style scoped>
h3 {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  /* border-radius: 12px; */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  /* background: rgb(4, 131, 242); */
  text-align: left;
}
/* .form-control {
  margin: 0.5rem 0;
} */
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
  /* background: gray;
  color: white; */
  padding: 0.05rem 1rem;
  border-radius: 15px;
}
/* input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label {
  font-weight: normal;
} */
</style>
