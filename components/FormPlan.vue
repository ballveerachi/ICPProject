<template>
  <div>
    <h3>แผนปฏิบัติ/เรียนรู้</h3>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="row">
      <div class="input-field col s4">
        <label for="plan-id">PL-ID/รหัสแผนเรียน/ทำ:</label>
        <!-- <input type="text" v-model="plan.planId" /> -->
        <input
          type="text"
          name="planId"
          v-model="plan.planId"
          placeholder="PL-ID/รหัสแผนเรียน/ทำ"
          required  disabled
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="career_plan-id">CA-ID/รหัสอาชีพ:</label>
        <!-- <input type="text" v-model="plan.planId" /> -->
        <input
          type="text"
          name="Career"
          v-model="planCareerId"
          placeholder="Career/อาชีพ"
          required  disabled
          class="form-control form-control-lg"
        />
        <select
          :size="4"
          v-model="planCareerId"
          :required="true"
          @change="getQualification()"
        >
          <option value="" disabled selected>อาชีพ:</option>
          <option
            v-for="career in careers"
            :value="career.Plan_Career_id"
            :key="career.index"
          >
            {{ career.Plan_Career_id }} {{ career.Name_Plan_Career }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s4">
        <label for="qualification-id">QA-ID/รหัสคุณสมบัติ:</label>
        <!-- <input type="text" v-model="plan.qualificationId" /> -->
        <input
          type="text"
          name="qualification"
          v-model="plan.qualificationId"
          placeholder="Qualification/คุณสมบัติ"
          required  disabled
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="plan.qualificationId">
          <option value="" disabled selected>กำหนดคุณสมบัติ:</option>
          <option
            v-for="career_qualification in career_qualifications"
            :value="career_qualification.qualificationId"
            :key="career_qualification.index"
          >
            {{ career_qualification.qualificationId }}
            {{ career_qualification.skill }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="leaning">Learning plan/แผนการเรียนรู้:</label>
        <!-- <input type="text" v-model="plan.leaning" /> -->
        <input
          type="text"
          name="leaning"
          v-model="plan.leaning"
          placeholder="Learnning plan/แผนการเรียนรู้"
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="doing">Doing plan/แผนปฏิบัติการ:</label>
        <!-- <input type="text" v-model="plan.doing" /> -->
        <input
          type="text"
          name="doing"
          v-model="plan.doing"
          placeholder="Do/แผนปฏิบัติการ"
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="form-contol">
      <!-- <button>Save data (บันทึกข้อมูล)</button> -->
      <input type="submit" value="Save/บันทึก" class="btn btn-success" />
      <input type="reset" value="Cancel/ยกเลิก" class="btn btn-danger" />
    </div>
  </form>
  <!-- <div class="py-2">
    {{ plans_ }}
  </div>
  <div class="py-2">
    {{ plan }}
  </div> -->
  <!-- <div>employee_id: {{ employee_id }} careers: {{ careers }}</div>
  <div>career_qualifications: {{ career_qualifications }}</div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">PL-ID</th>
          <th scope="col">QA-ID</th>
          <th scope="col">Do</th>
          <th scope="col">Lean</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in plans" :key="row.index">
          <td>{{ row.planId }}</td>
          <td>{{ row.qualificationId }}</td>
          <td>{{ row.doing }}</td>
          <td>{{ row.leaning }}</td>
          <td>
            <button class="btn btn-primary" @click="editUser(row.planId)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteUser(row.planId)">
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
  name: "FormPlan",
  data() {
    return {
      message: "Form Plan Career",
      careers: Array,
      career_qualifications: Array,
      plans: Array,
      plans_: Array,
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      //planId	qualificationId	doing leaning
      plan: {
        planId: "",
        qualificationId: "",
        doing: "",
        leaning: "",
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
      // this.plan.planId = 0;
      // this.plan.qualificationId = 0;
      this.plan.doing = "";
      this.plan.leaning = "";
      this.plan.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.plans = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career-qualification.php", {
          action: "getEmpCareer",
          employee_id: this.employee_id,
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers:", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQualification() {
      console.log(" แสดงข้อมูลคุณสมบัติ ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career-qualification.php", {
          action: "getCareer_Qualifiation",
          career_id: this.planCareerId,
        })
        .then(function (res) {
          console.log(res);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึก");
        console.log("Form Plan Career:", this.planCareer);
        const newPlan = {
          planId: this.plan.planId,
          qualificationId: this.plan.qualificationId,
          doing: this.plan.doing,
          leaning: this.plan.leaning,
        };
        this.$emit("saveData", newPlan);

        axios
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "insert",
            planId: this.plan.planId,
            qualificationId: this.plan.qualificationId,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
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
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "update",
            planId: this.plan.planId,
            qualificationId: this.plan.qualificationId,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
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
    editUser(planId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "edit",
          planId: planId,
        })
        .then(function (response) {
          console.log(response);
          self.plan.planId = response.data.planId;
          self.plan.qualificationId = response.data.qualificationId;
          self.plan.doing = response.data.doing;
          self.plan.leaning = response.data.leaning;

          self.plans_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(planId) {
      if (confirm("คุณต้องการลบรหัส " + planId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "delete",
            planId: planId,
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}
.form-control {
  margin: 0.5rem 0;
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
  /* background: gray;
  color: white; */
  padding: 0.05rem 1rem;
  border-radius: 15px;
}

</style>
