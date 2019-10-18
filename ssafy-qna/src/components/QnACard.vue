<template>
  <v-flex xs12>
    <v-card class="mx-auto">
      <v-card-text>
        <p class="display-1 text--primary">여기에 질문에 대한 Text가 들어간다.</p>
        <p>
          <v-icon small>access_time</v-icon>&nbsp;누가 언제 썼는지
        </p>
        <div id="QnACardLike">
          <!-- 하트 같은 아이콘으로 좋아요 개수 표시 -->
          <v-card-actions class="QnACardLikeAction">
            <v-btn flat icon color="primary">
              <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-icon class="QnACardFavorite">favorite</v-icon>
          </v-card-actions>
        </div>

        <div id="QnACardReply">
          <!-- 답변에 대한 공간 -->
          <div class="text--primary">이쯤에 답글이 들어가는건 어떨까</div>
          <p>
            <v-icon small>access_time</v-icon>&nbsp;누가 언제 썼는지
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4">
          <v-icon large>reply</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "QnACard",
  props: {},
  methods: {}
};
</script>

<style>
#QnACardReply {
  margin-left: 2%;
}

#QnACardLike {
  margin-bottom: 1%;
}

.QnACardFavorite {
}
</style>