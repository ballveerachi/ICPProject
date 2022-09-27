<template>
  <div>
<h3>ประเมินตนเอง</h3>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="row">
      <div class="input-field col s4">
        <label for="selfAssessment-id"> SA-ID/รหัสประเมินตนเอง: </label>
        <!-- <input type="text" v-model="selfAssessment.selfAssessmentId" /> -->
        <input
          type="text"
          name="selfAssessmentId"
          v-model="selfAssessment.selfAssessmentId"
          placeholder="SA-ID/รหัสประเมินตนเอง"
          required  disabled
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="career_plan-id">CA-ID/รหัสอาชีพ:</label>
        <!-- <input type="text" v-model="selfAssessment.selfAssessmentId" /> -->
        <input
          type="text"
          name="planCareerId"
          v-model="planCareerId"
          placeholder="CA-ID/รหัสอาชีพ"
          required  disabled
          class="form-control form-control-lg"
        />
        <select
          :size="4"
          v-model="planCareerId"
          :required="true"
          @change="getQualification()"
        >
          <option value="" disabled selected>อาชีพที่ต้องการ:</option>
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
        <label for="quanlification-id">QA-ID/รหัสคุณสมบัติ:</label>
        <!-- <input type="text" v-model="selfAssessment.qualificationId" /> -->
        <input
          type="text"
          name="quanlification-id"
          v-model="selfAssessment.qualificationId"
          placeholder="QA-ID/รหัสคุณสมบัติ"
          required  disabled
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="selfAssessment.qualificationId">
          <option value="" disabled selected>คุณสมบัติตามแผนอาชีพ:</option>
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
        <label for="month">Month/เดือน-{{currentYear}}</label>
        <!-- <input type="text" v-model="selfAssessment.month" /> -->
        <input
          type="text"
          name="month"
          v-model="selfAssessment.month"
          placeholder="Month/เดือน"
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="selfAssessment.month">
          <option value="" disabled selected>ประเมินเดือน:</option>
          <option value="มกราคม">มกราคม</option>
          <option value="กุมภาพันธ์">กุมภาพันธ์</option>
          <option value="มีนาคม">มีนาคม</option>
          <option value="เมษายน">เมษายน</option>
          <option value="พฤศภาคม">พฤศภาคม</option>
          <option value="มิถุนายน">มิถุนายน</option>
          <option value="กรกฏาคม">กรกฏาคม</option>
          <option value="สิงหาคม">สิงหาคม</option>
          <option value="กันยายน">กันยายน</option>
          <option value="ตุลาคม">ตุลาคม</option>
          <option value="พฤศจิกายน">พฤศจิกายน</option>
          <option value="ธันวาคม">ธันวาคม</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="self-assessment">SA/ประเมินตนเอง:</label>
        <!-- <input type="text" v-model="selfAssessment.assessment" /> -->
        <input
          type="text"
          name="self-assessment"
          v-model="selfAssessment.assessment"
          placeholder="SA/ประเมินตนเอง"
          class="form-control form-control-lg"
        />
        <div class="row">
          <div class="input-field col s4">
            <div class="form-group">
              <input
                type="radio"
                value="Yes"
                v-model="selfAssessment.assessment"
              />
              <label for="qualification_goal">Yes</label>
            </div>
          </div>
          <div class="input-field col s4">
            <div class="form-group">
              <input
                type="radio"
                value="No"
                v-model="selfAssessment.assessment"
              />
              <label for="qualification_goal">No</label>
            </div>
          </div>
        </div>
        <select :size="4" v-model="selfAssessment.assessment">
          <option value="" disabled selected>ประเมินตนเอง:</option>
          <option value="1">ระดับ 1/รู้จักทักษะนี้เล็กน้อย</option>
          <option value="2">ระดับ 2/เคยเรียนทักษะนี้มาบ้าง</option>
          <option value="3">ระดับ 3/เคยใช้ทักษะนี้เป็นครั้งคราว</option>
          <option value="4">ระดับ 4/ได้ใช้ทักษะนี้ประจําหรือในงาน</option>
          <option value="5">
            ระดับ 5/ปัจจุบันสามารถสอนทักษะนี้แก่ผู้อื่นได้
          </option>
        </select>
      </div>
    </div>
    <div class="form-contol">
      <input type="submit" value="Save/บันทึก" class="btn btn-success" />
      <input type="reset" value="Cancel/ยกเลิก" class="btn btn-danger" />
    </div>
  </form>
  <!-- <div class="py-2">
    {{ selfAssessments_ }}
  </div>
  <div class="py-2">
    {{ selfAssessment }}
  </div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">SA-ID</th>
          <th scope="col">QA-ID</th>
          <th scope="col">Month</th>
          <th scope="col">Self Assessment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in selfAssessments" :key="row.selfAssessmentId">
          <td>{{ row.selfAssessmentId }}</td>
          <td>{{ row.qualificationId }}</td>
          <td>{{ row.month }}</td>
          <td>{{ row.assessment }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="editUser(row.selfAssessmentId)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-warning"
              @click="deleteUser(row.selfAssessmentId)"
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
  name: "FormSelfAssessment",
  data() {
    return {
      message: "Form Self Acessment",
      currentYear: new Date().getFullYear(), 
      selfAssessments: Array,
      selfAssessments_: Array,
      careers: Array,
      career_qualifications: Array,
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      selfAssessment: {
        selfAssessmentId: "",
        qualificationId: "",
        month: "มกราคม",
        assessment: "ํYes",
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
      // this.selfAssessment.selfAssessmentId = 0;
      // this.selfAssessment.qualificationId = 0;
      this.selfAssessment.month = "";
      this.selfAssessment.assessment = "";
      this.selfAssessment.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.selfAssessments = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("qualification:", this.selfAssessment);
        const newSelfAssessment = {
          selfAssessmentId: this.selfAssessment.selfAssessmentId,
          qualificationId: this.selfAssessment.qualificationId,
          month: this.selfAssessment.month,
          assessment: this.selfAssessment.assessment,
          isVisible: this.selfAssessment.isVisible,
        };
        this.$emit("saveData", newSelfAssessment);

        axios
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "insert",
            selfAssessmentId: this.selfAssessment.selfAssessmentId,
            qualificationId: this.selfAssessment.qualificationId,
            month: this.selfAssessment.month,
            assessment: this.selfAssessment.assessment,
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
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "update",
            selfAssessmentId: this.selfAssessment.selfAssessmentId,
            qualificationId: this.selfAssessment.qualificationId,
            month: this.selfAssessment.month,
            assessment: this.selfAssessment.assessment,
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
    editUser(selfAssessmentId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
          action: "edit",
          selfAssessmentId: selfAssessmentId,
        })
        .then(function (response) {
          console.log(response);
          self.selfAssessment.selfAssessmentId = response.data.selfAssessmentId;
          self.selfAssessment.qualificationId = response.data.qualificationId;
          self.selfAssessment.month = response.data.month;
          self.selfAssessment.assessment = response.data.assessment;
          self.selfAssessments_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(selfAssessmentId) {
      if (confirm("คุณต้องการลบรหัส " + selfAssessmentId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "delete",
            selfAssessmentId: selfAssessmentId,
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

input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label {
  font-weight: normal;
}
</style>