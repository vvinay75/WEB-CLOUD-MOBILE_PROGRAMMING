package yong.umkc.edu.lab3;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.speech.tts.TextToSpeech;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private Button bGet;
    private Button bSave;
    private Button bTTS;
    private Button bSTT;
    private EditText etInput;
    private TextView tvOutput;
    private TextToSpeech tts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bSave = (Button) findViewById(R.id.bSave);
        bGet = (Button) findViewById(R.id.bGet);
        bTTS = (Button) findViewById(R.id.bTTS);
        bSTT = (Button) findViewById(R.id.bSTT);
        etInput = (EditText) findViewById(R.id.etInput);
        tvOutput = (TextView) findViewById(R.id.tvOutput);

        tts = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status != TextToSpeech.ERROR) {
                    tts.setLanguage(Locale.US);
                }
            }
        });

        bTTS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String toSpeak = etInput.getText().toString();
                if (toSpeak.length() != 0) {
                    Toast.makeText(getApplicationContext(), toSpeak, Toast.LENGTH_SHORT).show();
                    tts.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null);
                } else {
                    Toast.makeText(getApplicationContext(), "Empty data", Toast.LENGTH_LONG).show();
                }
            }
        });

        bSTT.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });
    }

    public void onPause(){
        if(tts !=null){
            tts.stop();
            tts.shutdown();
        }
        super.onPause();
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    etInput.setText(result.get(0));
                }
                break;
            }
        }
    }


    public void saveData(View view) {
        DBHelper db = new DBHelper(this);
        String data = etInput.getText().toString();
        if (data.length() != 0) {
            db.addRecord(new RecordData(data));
            etInput.setText("");
            Toast.makeText(getApplicationContext(), "Completed", Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(getApplicationContext(), "Empty data", Toast.LENGTH_LONG).show();
        }
    }

    public void getLastData(View view) {
        DBHelper db = new DBHelper(this);
        RecordData data = db.getData();
        tvOutput.setText(data.getText());
    }


}
